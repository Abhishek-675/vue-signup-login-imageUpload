<template>
    <div>
        <h1 class="header">{{ this.$store.state.headerTitle }}</h1>
    </div>
</template>

<script>
export default{
    name: 'HeaderComp',
}
</script>

<style scoped>
.header{
    color: orangered;
}
</style>


