<script setup lang="ts">

import AuthorCard from "../author-block/ui.vue";
import Article from "../article-content/ui.vue";
import ArticlesList from "../article-by-category-list/ui.vue";
</script>

<template>
  <ArticlesList />
  <AuthorCard
      :author="{ name: 'Иван Иванов' }"
      :publicationDate="'2023-09-15T10:30:00'"
      :articleCount="5"
  />
  <Article title="Lorem Ipsum" content="
        # Caerula quod
## Potest passibus sanguine
Lorem markdownum munus. Tamen iam tertia erit sanguineae nymphae!
Ad agiturque, traxerunt multos pater abstulit unum proditione multae fertur, nam
et notavi pharetram! Vires [venientis Lycum](http://siteo.com/solebat)
fretumque: huc, [ad profana](http://refert.com/nemus) spatium mihi futuri. Illa
inposuit vestros, Themin, quondam modo, Aeetias. Fruge lutulenta formatum undas
furens, inscius laborem **doleam imas** tantum Tyrrhena Peleu, quem torum.
## Sparsaque vagos dixit
Magis conplevit [spectant magnis](http://lotos-licet.com/); loqui inficere, est
obvertit sed munere stramina lacerae Cumaea cumulusque! [Haec
Gryneus](http://et.org/nuper.html), mortale in niveum Eurytidos Eumenides solet
parat.
- Dryades nec non fuit hodierna arcebat fama
- Dedit quaecumque tamen ambo lecto Mulciber
- Pronus sit quid virgis
- Tribuam et prodes referat
- Quoque nomen coloribus veluti
- Inguina quis Athamanas phocus

## Studio pars inmeritae perdiderat tamen an exilium

Finita prementem sceleris praedae: temptat insurgens, dolebo umeros? Moveri
gravitate triste Minyae. Idem terris, humum in novum sortem prima caede poste
inbellibus.

## Me undae arescere pristina satis madefacta pronus

Corpus enim plenos, mox agmina delicuit, in matri maius. Collum ab habet vel
colla cretus venientique patientia quamque [clarum arcton
postquam](http://dicitur.io/) tergoque latus coniungere sideribus? Antrum
pharetratae Aesacon in; gravis pulcherrima amat pectora auras; ecce. Fisa danda
nux ille Eurotas crimine sed, tecto adhuc exstantem nunc praetentaque gravi!

Armenti et pugnare teneri cum tenuere Oebalide navita sensit luce volet ex [mora
questus tardarunt](http://superum-tua.org/abit-sortes) revulsos lunae tormentis.
Cultro dea, urbes!

Cumaeae Achivi patrem aequor decertare aristas et medioque Troum pars, templo.
Fortisque carbasa consanguineas ait pariter
[sic](http://possitest.org/aera-postquam), quem virtute, lapsae, obvertit
Talibus quaerit. Umbris dicitur et mihi delicta sit novabis munera ex meae
versatus et. Saxi Amphione est erat, pascua? Fuerat quis me quoque diligis, est
potest Titania; caeli claro nobis doleam protinus, gramine.

        " />
</template>

<style scoped>

</style>