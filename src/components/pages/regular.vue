<template>
  <div :id="`page-${pageName}`">
      <Navbar />
      <SectionMain>
          <slot></slot>
      </SectionMain>
      <Footer />
  </div>
</template>

<script>
import Navbar from "../ui/Navbar"
import Footer from "../ui/Footer"
import SectionMain from "../ui/sections/main-section"
export default {
    props:{
        pageId: String,
        pageName: String
    },
    components:{
        Navbar,Footer,SectionMain
    }
}
</script>

<style>

</style>