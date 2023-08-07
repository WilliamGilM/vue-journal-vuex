<template>
    <div 
        class="entry-container mb-3 pointer p-2"
        @click="$router.push({ name: 'entry', params: { id: 10 } })"
    >
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">30</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2023,Domingo</span>
        </div>

        <div class="entry-description">
            Enim laborum sint cupidatat consequat id enim ullamco sit officia in.
        </div>
    </div>
</template>

<script>
export default {
    name: "EnTry"
}
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description {
        font-size: 12px;
    }
}

</style>