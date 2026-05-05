import slug from "slug";

export const getSlug = (handle: string) : string =>{
    return slug(handle);
}