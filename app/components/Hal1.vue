<!-- Page1.vue -->

<template>
    <Page actionBarHidden="true">
        <Label text="Page1" />
        <StackLayout>
            <Button text="Home" horizontalAlignment="center" @tap="$goto('home')" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {};
</script>