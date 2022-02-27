<template>
  <div class="q-pa-lg bg-white">
    <div class="" id="graphdiv"></div>
  </div>
</template>
<script>
import dygraphs from 'dygraphs'
export default {
  mounted() {
    new dygraphs("graphdiv",
      `Date,A,B
      2016/01/01,10,20
      2016/07/01,20,10
      2016/12/31,40,30
      `, {
        fillGraph: true,
        ylabel: 'Temp',
        xlabel: 'Date',
      }
    )
  },
}
</script>

<style type="text/css">
.dygraph-ylabel {
	padding-left: 30px;
	transform: rotate(270deg);
}</style>
