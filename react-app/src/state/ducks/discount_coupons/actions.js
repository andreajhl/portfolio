import apiService from "../../utils/apiService";
import * as API_PATHS from "./paths";

export const getDiscountCouponBanner = async () => {
    let response = null;
    await apiService({
        method: "GET",
        path: API_PATHS.GET_DISCOUNT_COUPONS_BANNER,
        async: true
    }).then((res) => {
        if (res.data.status === "OK") {
            response = res.data.data;
        }
    }).catch((err) => console.log(err));
    return response;
};
