export default async function useAuthenticated() {
    const isAccept = useState(() => false);
    const adminAuth = useCookie("adminAuth");

    const verifyLogin = async () => {
        if (adminAuth.value) {
            const loginValidate = await useFetch("api/validateLogin", {
                method: 'POST',
                body: JSON.stringify({token: adminAuth.value}),
                headers: {"Content-Type": "application/json"},
            });

            if (loginValidate.data.value) {
                isAccept.value = true
            }
            isAccept.value = false
        }
    };

    const signed = computed(async () => {
        if (isAccept.value) {
            return true
        }

        const loginValidate = await useFetch("api/validateLogin", {
            method: 'POST',
            body: JSON.stringify({token: adminAuth.value}),
            headers: {"Content-Type": "application/json"},
        });

        if (loginValidate.data.value) {
            isAccept.value = true
            return true
        }

        return false;
    });

    return {signed, verifyLogin};
}
