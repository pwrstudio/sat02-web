<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
</script>

{#if $languageStore == LANGUAGE.ARABIC}
  <!-- ARABIC -->
  <p>
    لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار النشوة وتمجيد
    الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة
    البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء
    الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية
    ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في
    الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن
    السعاده فيما نتحمله من كد وأسي.
  </p>
  <p>
    و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على
    ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة التي
    لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه بعض
    المتعة ؟
  </p>
  <p>
    علي الجانب الآخر نشجب ونستنكر هؤلاء الرجال المفتونون بنشوة اللحظة الهائمون
    في رغباتهم فلا يدركون ما يعقبها من الألم والأسي المحتم، واللوم كذلك يشمل
    هؤلاء الذين أخفقوا في واجباتهم نتيجة لضعف إرادتهم فيتساوي مع هؤلاء الذين
    يتجنبون وينأون عن تحمل الكدح والألم .
  </p>
{:else}
  <!-- ENGLISH -->
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et mauris
    vel nulla cursus mollis vitae vitae odio. Aliquam ante justo, efficitur
    maximus ante at, interdum luctus felis. Sed quis arcu sit amet dui commodo
    posuere et at quam. Curabitur vehicula tortor non arcu ultrices pharetra.
    Sed mi metus, euismod ac mauris sit amet, semper dapibus urna. Proin feugiat
    facilisis sapien ac laoreet. Fusce cursus leo aliquam nisi lobortis ornare.
    Morbi metus nulla, vestibulum vel consectetur quis, mollis fermentum arcu.
    Mauris sagittis bibendum libero, a tempor augue euismod nec. In semper lacus
    ut nunc fermentum, quis porttitor magna molestie. Aenean placerat vehicula
    orci, at interdum nibh tempor vel. Maecenas finibus, lorem at tincidunt
    egestas, dolor massa maximus massa, id venenatis mauris dui vel felis. Fusce
    dapibus ex leo, vel semper odio auctor sit amet. In vulputate rutrum odio,
    id tempus libero dapibus non.
  </p>
  <p>
    Fusce sed dolor vel magna faucibus pellentesque. Ut blandit rutrum enim, sit
    amet commodo risus dictum nec. Sed at lorem felis. Donec sed mi sit amet
    odio rhoncus accumsan sit amet id nulla. Donec vel hendrerit sem. Morbi
    scelerisque turpis pellentesque ligula varius gravida. Nunc varius magna vel
    risus varius, ut dignissim nisi dignissim. Donec vitae facilisis lectus, eu
    pellentesque tellus. Phasellus a augue arcu. Vestibulum consectetur arcu
    quam, vel scelerisque sem luctus scelerisque. Suspendisse in magna erat.
  </p>
  <p>
    Nulla nec justo orci. Vestibulum ante ipsum primis in faucibus orci luctus
    et ultrices posuere cubilia curae; Sed eget quam sit amet mi euismod
    placerat. Ut rhoncus rhoncus mauris, nec semper dolor rhoncus eu. Donec et
    semper eros. Class aptent taciti sociosqu ad litora torquent per conubia
    nostra, per inceptos himenaeos. Nam vel dolor non nisl volutpat accumsan.
    Nam blandit et arcu vel ullamcorper. Quisque dictum turpis ac neque
    vulputate, quis sagittis lectus dapibus. Nulla lectus enim, rhoncus nec
    maximus non, consectetur sed velit. Suspendisse vitae vehicula quam.
  </p>
{/if}
