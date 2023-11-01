<script lang="ts">
  import { languageStore, urlPrefix } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  import truncate from "lodash/truncate.js"
  import has from "lodash/has.js"
  import { toPlainText, urlFor } from "$lib/modules/sanity"
  export let page: any = {}

  const DEFAULT_DESCRIPTION = "SAT02"
  const BASE_TITLE = "Sharjah Architecture Triennial 2023"
  const DEFAULT_IMAGE = "https://2023.sharjaharchitecture.org/images/sat02.jpg"
  const BASE_URL = "https://2023.sharjaharchitecture.org"

  /**
   * Returns the formatted title based on the current language.
   *
   * @param {any} p - The object containing title details.
   * @returns {string} - The formatted title.
   */
  const getTitle = (p: any) => {
    if ($languageStore == LANGUAGE.ENGLISH) {
      return (p.title ? p.title + " | " : "") + BASE_TITLE
    } else {
      return (p.title_ar ? p.title_ar + " | " : "") + BASE_TITLE
    }
  }

  /**
   * Retrieves and formats the description based on the current language, truncating it to 240 characters.
   *
   * @param {any} p - The object containing description details.
   * @returns {string} - The truncated description.
   */
  const getDescription = (p: any) => {
    let d = ""
    if ($languageStore == LANGUAGE.ENGLISH) {
      d = p.description?.content
        ? toPlainText(p.description.content)
        : DEFAULT_DESCRIPTION
    } else {
      d = p.description_ar?.content
        ? toPlainText(p.description_ar.content)
        : DEFAULT_DESCRIPTION
    }
    return truncate(d, {
      length: 240,
      separator: /.? +/,
    })
  }

  /**
   * Constructs a URL based on the given page type and slug.
   *
   * @param {any} p - The object containing URL details.
   * @returns {string} - The constructed URL.
   */
  const getUrl = (p: any) => {
    if (page._type == "page") {
      return BASE_URL + $urlPrefix + (p.slug?.current || "")
    } else {
      return (
        BASE_URL +
        $urlPrefix +
        (page._type == "event" ? "calendar" : page._type + "s") +
        "/" +
        (p.slug?.current || "")
      )
    }
  }

  /**
   * Retrieves the image URL if available, or returns a default image URL.
   *
   * @param {any} p - The object containing image details.
   * @returns {string} - The image URL or default image URL.
   */
  const getImage = (p: any) => {
    return has(p, "featuredImage.asset")
      ? urlFor(p.featuredImage.asset).width(800).quality(90).url()
      : DEFAULT_IMAGE
  }

  let title = getTitle(page)
  let description = getDescription(page)
  let url = getUrl(page)
  let image = getImage(page)
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="article" />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={title} />
  <meta property="og:title" content={title} />
  <meta property="description" content={description} />
  <meta property="og:description" content={description} />
  <meta property="image" content={image} />
  <meta property="og:image" content={image} />
  <meta property="twitter:image" content={image} />
  <meta property="og:site_name" content={BASE_TITLE} />
</svelte:head>
