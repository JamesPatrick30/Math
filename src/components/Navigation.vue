<template>
    <header :class="{'scrolled-nav' : scrollPosition}">
        <nav>
            <div class="branding">

            </div>
            <ul v-show="!moble" class="navigation">
                <li><router-link to="/">Home</router-link> </li>
                <li> <router-link :to="{name : 'about'}">About</router-link></li>
                <li><router-link :to="{name : 'help'}">Help</router-link></li>
            </ul>
            <div class="icon">
                <i @click="toggleMobile" class="far ro-bars" :class="{'icon-active' : mobileNav}">

                </i>
            </div>
            <transition name="moblie-nav">
                <ul v-show="mobileNav" class="drop-nav" >
                    <li><router-link to="/">Home</router-link> </li>
                    <li> <router-link :to="{name : 'about'}">About</router-link></li>
                    <li><router-link :to="{name : 'help'}">Help</router-link></li>
                </ul>
            </transition>
        </nav>
    </header>
</template>
<script>

</script>

<style lang="scss" scoped>
header{
    background-color: (0,0,0,0.8);
    
}
</style>