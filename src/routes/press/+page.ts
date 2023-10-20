import { loadData } from "$lib/modules/sanity.js"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const page = await loadData("*[_id == 'press'][0]", {})
    const pressReleases = await loadData("*[_type == 'pressRelease']{..., 'pdf': pdf.asset->url} | order(date)", {})
    const pressCoverage = await loadData("*[_type == 'pressCoverage']{..., 'pdf': pdf.asset->url} | order(date)", {})
    return { page, pressReleases, pressCoverage };
}