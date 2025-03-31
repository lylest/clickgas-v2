import {post} from "@/api/requests.ts";

export const uploadFile = (data:FormData) => {
    return post("/file",data );
}