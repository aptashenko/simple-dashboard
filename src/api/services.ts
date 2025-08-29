import type {ILoginPayload} from "@/modules/auth/types";
import type {ICartItem} from "@/modules/cart/types";

export function login(payload: ILoginPayload): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (payload.email === "admin@demo.com" && payload.password === "demo123") {
                const fakeToken = "fake_jwt_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
                resolve({ token: fakeToken });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 500);
    });
}


export function fetchProducts(): Promise<ICartItem[]> {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Window A", options: ["Blue Frame", "Double Glass"] },
                { id: 2, name: "Window B", options: ["Red Frame", "Triple Glass"] },
                { id: 3, name: "Door A", options: ["Metallic", "Wooden"] },
            ])
        }, 500);
    });
}
