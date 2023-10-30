export enum ArabicTerms {
    MENU = 'القائمة',
    CLOSE = 'أغلق',
    PROJECT_S = 'المشروع',
    PARTICIPANT_S = 'المشاركين',
    FIELD_NOTE_S = 'ملاحظات',
    CALENDAR = 'التقويم',
    ABOUT = 'عن الترينالي',
    VENUE_S = 'المواقع',
    TEAM = 'الفريق',
    CONTACT = 'معلومات التواصل',
    EVENT = 'الفعالية',
    RELATED_EVENTS = 'فعاليات مشابهة',
    PAST = 'فعاليات سابقة',
    UPCOMING = 'فعاليات قادمة',
    NOW = 'الفعاليات الحالية',
    STARTS_IN_X_DAY_S = 'يبدأ يوم',
    STARTS_IN_X_HOUR_S = 'يبدأ في الساعة',
    SEARCH = 'ابحث',
    RESULTS = 'النتائج',
    OPEN = 'افتح',
    OPEN_SLIDESHOW = 'افتح العرض',
    SHOW_IMAGES = 'عرض الصور',
    REQUEST_PRESS_KIT = 'طلب المعلومات الصحفية',
    FIELD_NOTES_ON_SCARCITY = 'ملاحظات ميدانية: عن الندرة',
    // !!!
    PRESS = "press",
    DESIGN_STORE = "design store",
}

export const MENU_ITEMS = [
    {
        title: "Projects",
        ar: ArabicTerms.PROJECT_S,
        link: "projects",
    },
    {
        title: "Participants",
        ar: ArabicTerms.PARTICIPANT_S,
        link: "participants",
    },
    {
        title: "Calendar",
        ar: ArabicTerms.CALENDAR,
        link: "calendar",
    },
    {
        title: "Design Store",
        ar: ArabicTerms.DESIGN_STORE,
        link: "design-store",
    },
    {
        title: "Field Notes: On Scarcity",
        ar: ArabicTerms.FIELD_NOTES_ON_SCARCITY,
        link: "field-notes",
    },
    {
        title: "Theme",
        ar: ArabicTerms.ABOUT,
        link: "theme",
    },
    {
        title: "Venues",
        ar: ArabicTerms.VENUE_S,
        link: "venues",
    },
    {
        title: "Team",
        ar: ArabicTerms.TEAM,
        link: "team",
    },
    {
        title: "Press",
        ar: ArabicTerms.PRESS,
        link: "press",
    },
    {
        title: "Contact",
        ar: ArabicTerms.CONTACT,
        link: "contact",
    },
]

export const siteTitle = {
    en: "SHARJAH ARCHITECTURE TRIENNIAL 02",
    ar: "ترينالي الشارقة للعمارة",
}

export const COLORS = ["white", "green", "orange", "blue", "purple"]

export const SHARJAH_COORDINATES = { lat: 25.3559938, lon: 55.3948732 }

export const Al_QASIMIA_SCHOOL_COORDINATES = { lat: 25.3515697, lon: 55.393875 }

export const AL_JUBAIL_OLD_VEGETABLE_MARKET_COORDINATES = { lat: 25.3518652, lon: 55.3820368 }

export const OWN_API_KEY = '9503055d09f6f4afda4d4e550767aa84';

export const MAPBOXGL_ACCESS_TOKEN = 'pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNsYnc5NmQzOTB2MWQzcW55ZzAyODRucG8ifQ.6RvyoY4e0kM10ABYxicjBg';
