/* eslint-disable @typescript-eslint/no-explicit-any */





export const registerUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        console.log("Formdata --- ", payload);

    } catch (error: any) {
        if (error?.digest?.startWith('NEXT_REDIRECT')) {
            throw error;
        }
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again"}` };
    }
}