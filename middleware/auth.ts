export default defineNuxtRouteMiddleware(async () => {
    const {signed} = await useAuthenticated();

    if (await signed.value) {
        console.log("Authenticated")
    } else {
        return navigateTo("/login")
    }
});
