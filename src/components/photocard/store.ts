import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createSlide, defaultCreditBox, defaultCreditStyle, defaultLogoBox, defaultOverlay, defaultSubtitleBox, defaultSubtitleStyle, defaultTitleStyle, uid } from "./defaults";
import type { PresetTemplate } from "./templates/preset-templates";
import type { BoxTransform, LogoState, OverlaySettings, RatioKey, SlideData, TextFieldState, TextStyle, UploadedFont, UploadedImage } from "./types";

const initialSlide: SlideData = {
  ...createSlide(""),
  id: "initial-slide-1",
};

interface PhotocardStore {
  projectName: string;
  setProjectName: (name: string) => void;

  ratio: RatioKey;
  setRatio: (ratio: RatioKey) => void;

  /** Bumped to force every slide canvas to clear its multi-selection —
   *  used right before export so selection outlines never get captured. */
  selectionResetToken: number;
  requestClearSelections: () => void;

  images: UploadedImage[];
  addImages: (files: File[]) => UploadedImage[];
  removeImage: (id: string) => void;

  fonts: UploadedFont[];
  addFont: (font: UploadedFont) => void;
  removeFont: (id: string) => void;

  titleStyle: TextStyle;
  updateTitleStyle: (patch: Partial<TextStyle>) => void;

  subtitleStyle: TextStyle;
  updateSubtitleStyle: (patch: Partial<TextStyle>) => void;

  creditStyle: TextStyle;
  updateCreditStyle: (patch: Partial<TextStyle>) => void;

  overlay: OverlaySettings;
  updateOverlay: (patch: Partial<OverlaySettings>) => void;

  useSameLogoForAll: boolean;
  setUseSameLogoForAll: (v: boolean) => void;
  globalLogo: LogoState;
  updateGlobalLogo: (patch: Partial<LogoState>) => void;

  useSameSubtitleForAll: boolean;
  setUseSameSubtitleForAll: (v: boolean) => void;
  globalSubtitle: TextFieldState;
  updateGlobalSubtitle: (patch: Partial<TextFieldState>) => void;

  useSameCreditForAll: boolean;
  setUseSameCreditForAll: (v: boolean) => void;
  globalCredit: TextFieldState;
  updateGlobalCredit: (patch: Partial<TextFieldState>) => void;

  slides: SlideData[];
  activeSlideId: string;
  setActiveSlideId: (id: string) => void;

  createNewProject: () => void;
  applyPresetTemplate: (template: PresetTemplate) => void;
  addSlide: () => void;
  addNewTitle: (title: string) => void;
  addSlidePair: (title: string, subtitle: string) => void;
  addBatchSlides: (items: { title: string; subtitle?: string }[] | string[]) => void;
  removeSlide: (id: string) => void;
  updateSlideTitle: (id: string, title: string) => void;
  setSlideImage: (id: string, imageId: string | null) => void;
  updateSlideTitleBox: (id: string, box: BoxTransform) => void;
  updateSlideLogo: (id: string, patch: Partial<LogoState>) => void;
  updateSlideLogoBox: (id: string, box: BoxTransform) => void;
  updateSlideSubtitle: (id: string, patch: Partial<TextFieldState>) => void;
  updateSlideSubtitleBox: (id: string, box: BoxTransform) => void;
  updateSlideCredit: (id: string, patch: Partial<TextFieldState>) => void;
  updateSlideCreditBox: (id: string, box: BoxTransform) => void;
  reorderSlide: (from: number, to: number) => void;
}

export const usePhotocardStore = create<PhotocardStore>()(
  persist(
    (set) => ({
      projectName: "Untitled Project",
      setProjectName: (projectName) => set({ projectName }),

      ratio: "1:1",
      setRatio: (ratio) => set({ ratio }),

      selectionResetToken: 0,
      requestClearSelections: () => set((s) => ({ selectionResetToken: s.selectionResetToken + 1 })),

      images: [],
      addImages: (files) => {
        const created = files.map((f) => {
          const id = uid();
          const tempUrl = URL.createObjectURL(f);
          const item = { id, name: f.name, url: tempUrl };

          // Convert to base64 Data URL so it persists in localStorage
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            set((s) => ({
              images: s.images.map((img) => (img.id === id ? { ...img, url: dataUrl } : img)),
            }));
          };
          reader.readAsDataURL(f);

          return item;
        });

        set((s) => ({ images: [...s.images, ...created] }));
        return created;
      },
      removeImage: (id) =>
        set((s) => ({
          images: s.images.filter((i) => i.id !== id),
          slides: s.slides.map((sl) => (sl.imageId === id ? { ...sl, imageId: null } : sl)),
        })),

      fonts: [],
      addFont: (font) => set((s) => ({ fonts: [...s.fonts, font] })),
      removeFont: (id) => set((s) => ({ fonts: s.fonts.filter((f) => f.id !== id) })),

      titleStyle: defaultTitleStyle(),
      updateTitleStyle: (patch) => set((s) => ({ titleStyle: { ...s.titleStyle, ...patch } })),

      subtitleStyle: defaultSubtitleStyle(),
      updateSubtitleStyle: (patch) => set((s) => ({ subtitleStyle: { ...s.subtitleStyle, ...patch } })),

      creditStyle: defaultCreditStyle(),
      updateCreditStyle: (patch) => set((s) => ({ creditStyle: { ...s.creditStyle, ...patch } })),

      overlay: defaultOverlay(),
      updateOverlay: (patch) => set((s) => ({ overlay: { ...s.overlay, ...patch } })),

      useSameLogoForAll: false,
      setUseSameLogoForAll: (v) => set({ useSameLogoForAll: v }),
      globalLogo: { imageId: null, box: defaultLogoBox() },
      updateGlobalLogo: (patch) => set((s) => ({ globalLogo: { ...s.globalLogo, ...patch } })),

      useSameSubtitleForAll: true,
      setUseSameSubtitleForAll: (v) =>
        set((s) => {
          const activeSlide = s.slides.find((sl) => sl.id === s.activeSlideId) || s.slides[0];
          const textToApply = activeSlide ? activeSlide.subtitle.text : s.globalSubtitle.text;
          const updatedGlobal = { ...s.globalSubtitle, text: textToApply };

          return {
            useSameSubtitleForAll: v,
            globalSubtitle: updatedGlobal,
            slides: v
              ? s.slides.map((sl) => ({
                  ...sl,
                  subtitle: { ...sl.subtitle, text: textToApply },
                }))
              : s.slides,
          };
        }),
      globalSubtitle: { text: "", box: defaultSubtitleBox() },
      updateGlobalSubtitle: (patch) =>
        set((s) => {
          const updatedGlobal = { ...s.globalSubtitle, ...patch };
          return {
            globalSubtitle: updatedGlobal,
            slides: s.useSameSubtitleForAll && patch.text !== undefined
              ? s.slides.map((sl) => ({
                  ...sl,
                  subtitle: { ...sl.subtitle, text: patch.text as string },
                }))
              : s.slides,
          };
        }),

      useSameCreditForAll: true,
      setUseSameCreditForAll: (v) =>
        set((s) => {
          const activeSlide = s.slides.find((sl) => sl.id === s.activeSlideId) || s.slides[0];
          const textToApply = activeSlide ? activeSlide.credit.text : s.globalCredit.text;
          const updatedGlobal = { ...s.globalCredit, text: textToApply };

          return {
            useSameCreditForAll: v,
            globalCredit: updatedGlobal,
            slides: v
              ? s.slides.map((sl) => ({
                  ...sl,
                  credit: { ...sl.credit, text: textToApply },
                }))
              : s.slides,
          };
        }),
      globalCredit: { text: "", box: defaultCreditBox() },
      updateGlobalCredit: (patch) =>
        set((s) => {
          const updatedGlobal = { ...s.globalCredit, ...patch };
          return {
            globalCredit: updatedGlobal,
            slides: s.useSameCreditForAll && patch.text !== undefined
              ? s.slides.map((sl) => ({
                  ...sl,
                  credit: { ...sl.credit, text: patch.text as string },
                }))
              : s.slides,
          };
        }),

      slides: [initialSlide],
      activeSlideId: initialSlide.id,
      setActiveSlideId: (activeSlideId) => set({ activeSlideId }),

      createNewProject: () =>
        set(() => {
          const firstSlide = createSlide("");
          return {
            projectName: "Untitled Project",
            ratio: "1:1",
            slides: [firstSlide],
            activeSlideId: firstSlide.id,
            useSameSubtitleForAll: false,
            useSameCreditForAll: false,
            useSameLogoForAll: false,
            globalSubtitle: { text: "", box: defaultSubtitleBox() },
            globalCredit: { text: "", box: defaultCreditBox() },
            globalLogo: { imageId: null, box: defaultLogoBox() },
          };
        }),

      applyPresetTemplate: (template) =>
        set((s) => {
          const newSlide = createSlide(template.title);
          newSlide.subtitle.text = template.subtitle;
          newSlide.credit.text = template.credit;

          return {
            projectName: template.name,
            ratio: template.ratio,
            slides: [newSlide],
            activeSlideId: newSlide.id,
            titleStyle: {
              ...s.titleStyle,
              ...template.titleStyle,
            },
            subtitleStyle: {
              ...s.subtitleStyle,
              ...template.subtitleStyle,
            },
            creditStyle: {
              ...s.creditStyle,
              ...template.creditStyle,
            },
            overlay: {
              ...s.overlay,
              ...template.overlay,
            },
            useSameSubtitleForAll: false,
            useSameCreditForAll: false,
          };
        }),

      addSlide: () =>
        set((s) => {
          const newSlide = createSlide("");
          if (s.useSameSubtitleForAll) {
            newSlide.subtitle.text = s.globalSubtitle.text;
          }
          if (s.useSameCreditForAll) {
            newSlide.credit.text = s.globalCredit.text;
          }
          if (s.useSameLogoForAll) {
            newSlide.logo.imageId = s.globalLogo.imageId;
          }
          return {
            slides: [...s.slides, newSlide],
            activeSlideId: newSlide.id,
          };
        }),

      addNewTitle: (title) =>
        set((s) => {
          const trimmed = title.trim();
          if (!trimmed) return s;

          if (s.slides.length === 1 && !s.slides[0].title.trim()) {
            return {
              slides: [{ ...s.slides[0], title: trimmed }],
            };
          }

          const newSlide = createSlide(trimmed);
          if (s.useSameSubtitleForAll) {
            newSlide.subtitle.text = s.globalSubtitle.text;
          }
          if (s.useSameCreditForAll) {
            newSlide.credit.text = s.globalCredit.text;
          }
          if (s.useSameLogoForAll) {
            newSlide.logo.imageId = s.globalLogo.imageId;
          }

          return {
            slides: [...s.slides, newSlide],
            activeSlideId: newSlide.id,
          };
        }),

      addSlidePair: (title, subtitle) =>
        set((s) => {
          const trimmedTitle = title.trim();
          const trimmedSub = subtitle.trim();

          if (s.slides.length === 1 && !s.slides[0].title.trim()) {
            const updated = {
              ...s.slides[0],
              title: trimmedTitle,
              subtitle: { ...s.slides[0].subtitle, text: trimmedSub },
            };
            return {
              useSameSubtitleForAll: false,
              slides: [updated],
            };
          }

          const newSlide = createSlide(trimmedTitle);
          newSlide.subtitle.text = trimmedSub;
          if (s.useSameCreditForAll) {
            newSlide.credit.text = s.globalCredit.text;
          }
          if (s.useSameLogoForAll) {
            newSlide.logo.imageId = s.globalLogo.imageId;
          }

          return {
            useSameSubtitleForAll: false,
            slides: [...s.slides, newSlide],
            activeSlideId: newSlide.id,
          };
        }),

      addBatchSlides: (items) =>
        set((s) => {
          if (items.length === 0) return s;

          const parsed: { title: string; subtitle?: string }[] = items.map((it) =>
            typeof it === "string" ? { title: it } : it
          );

          const activeSlideIndex = Math.max(0, s.slides.findIndex((sl) => sl.id === s.activeSlideId));
          const nextSlides = [...s.slides];
          const hasSubtitles = parsed.some((it) => it.subtitle && it.subtitle.trim().length > 0);

          parsed.forEach((item, i) => {
            const targetIndex = activeSlideIndex + i;
            if (targetIndex < nextSlides.length) {
              nextSlides[targetIndex] = {
                ...nextSlides[targetIndex],
                title: item.title,
                subtitle: {
                  ...nextSlides[targetIndex].subtitle,
                  text: item.subtitle !== undefined ? item.subtitle : nextSlides[targetIndex].subtitle.text,
                },
              };
            } else {
              const newSlide = createSlide(item.title);
              if (item.subtitle !== undefined) {
                newSlide.subtitle.text = item.subtitle;
              } else if (s.useSameSubtitleForAll) {
                newSlide.subtitle.text = s.globalSubtitle.text;
              }
              if (s.useSameCreditForAll) {
                newSlide.credit.text = s.globalCredit.text;
              }
              if (s.useSameLogoForAll) {
                newSlide.logo.imageId = s.globalLogo.imageId;
              }
              nextSlides.push(newSlide);
            }
          });

          const lastTargetIndex = activeSlideIndex + parsed.length - 1;
          const lastActiveId = nextSlides[lastTargetIndex]?.id || s.activeSlideId;

          return {
            useSameSubtitleForAll: hasSubtitles ? false : s.useSameSubtitleForAll,
            slides: nextSlides,
            activeSlideId: lastActiveId,
          };
        }),

      removeSlide: (id) =>
        set((s) => {
          if (s.slides.length <= 1) return s;
          const nextSlides = s.slides.filter((sl) => sl.id !== id);
          const nextActiveId =
            s.activeSlideId === id
              ? nextSlides[0]?.id || ""
              : s.activeSlideId;
          return { slides: nextSlides, activeSlideId: nextActiveId };
        }),
      updateSlideTitle: (id, title) =>
        set((s) => ({ slides: s.slides.map((sl) => (sl.id === id ? { ...sl, title } : sl)) })),
      setSlideImage: (id, imageId) =>
        set((s) => ({ slides: s.slides.map((sl) => (sl.id === id ? { ...sl, imageId } : sl)) })),
      updateSlideTitleBox: (id, box) =>
        set((s) => ({ slides: s.slides.map((sl) => (sl.id === id ? { ...sl, titleBox: box } : sl)) })),
      updateSlideLogo: (id, patch) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, logo: { ...sl.logo, ...patch } } : sl)),
        })),
      updateSlideLogoBox: (id, box) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, logo: { ...sl.logo, box } } : sl)),
        })),
      updateSlideSubtitle: (id, patch) =>
        set((s) => {
          if (s.useSameSubtitleForAll && patch.text !== undefined) {
            return {
              globalSubtitle: { ...s.globalSubtitle, text: patch.text },
              slides: s.slides.map((sl) => ({
                ...sl,
                subtitle: { ...sl.subtitle, text: patch.text as string },
              })),
            };
          }
          return {
            slides: s.slides.map((sl) => (sl.id === id ? { ...sl, subtitle: { ...sl.subtitle, ...patch } } : sl)),
          };
        }),
      updateSlideSubtitleBox: (id, box) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, subtitle: { ...sl.subtitle, box } } : sl)),
        })),
      updateSlideCredit: (id, patch) =>
        set((s) => {
          if (s.useSameCreditForAll && patch.text !== undefined) {
            return {
              globalCredit: { ...s.globalCredit, text: patch.text },
              slides: s.slides.map((sl) => ({
                ...sl,
                credit: { ...sl.credit, text: patch.text as string },
              })),
            };
          }
          return {
            slides: s.slides.map((sl) => (sl.id === id ? { ...sl, credit: { ...sl.credit, ...patch } } : sl)),
          };
        }),
      updateSlideCreditBox: (id, box) =>
        set((s) => ({
          slides: s.slides.map((sl) => (sl.id === id ? { ...sl, credit: { ...sl.credit, box } } : sl)),
        })),
      reorderSlide: (from, to) =>
        set((s) => {
          const next = [...s.slides];
          const [moved] = next.splice(from, 1);
          next.splice(to, 0, moved);
          return { slides: next };
        }),
    }),
    {
      name: "photocard-studio-progress",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        projectName: state.projectName,
        ratio: state.ratio,
        images: state.images,
        fonts: state.fonts,
        titleStyle: state.titleStyle,
        subtitleStyle: state.subtitleStyle,
        creditStyle: state.creditStyle,
        overlay: state.overlay,
        useSameLogoForAll: state.useSameLogoForAll,
        globalLogo: state.globalLogo,
        useSameSubtitleForAll: state.useSameSubtitleForAll,
        globalSubtitle: state.globalSubtitle,
        useSameCreditForAll: state.useSameCreditForAll,
        globalCredit: state.globalCredit,
        slides: state.slides,
        activeSlideId: state.activeSlideId,
      }),
    }
  )
);
