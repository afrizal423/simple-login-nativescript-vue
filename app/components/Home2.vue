<!-- Home.vue -->

<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="This is Home Component"></Label>
        </ActionBar>
        <StackLayout>
            <Button text="Page 1" horizontalAlignment="center" @tap="$goto('page1')" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {};
</script>