export enum ArabicTerms {
    MENU = 'القائمة',
    CLOSE = 'أغلق',
    PROJECT_S = 'المشروع',
    PARTICIPANT_S = 'المشاركين',
    FIELD_NOTE_S = 'ملاحظات',
    CALENDAR = 'التقويم',
    ABOUT = 'بيان القيّمة',
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
    PRESS = "المواد الاعلامية",
    DESIGN_STORE = "متجر الترينالي للتصميم",
    PRESS_RELEASES = "البيانات الصحفية",
    PRESS_COVERAGE = "التغطية الصحفية"
}

export const MENU_ITEMS = [
    {
        title: "Curatorial Statement",
        ar: ArabicTerms.ABOUT,
        link: "curatorial-statement",
    },
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
        title: "Field Notes on Scarcity",
        ar: ArabicTerms.FIELD_NOTES_ON_SCARCITY,
        link: "field-notes",
    },
    {
        title: "Design Store",
        ar: ArabicTerms.DESIGN_STORE,
        link: "design-store",
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