import axios, { AxiosError, AxiosResponse } from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// simulate dataloading
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials= true;
// const history = useNavigate();
const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

// intercept => abfangen von errors
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    // in case onFulfilled? => erfüllt seccussd
    return response;
  },
  (error: AxiosError) => {
    // in case error
    const { data, status } = error.response as any; // as any to override typescript we dont need to create a type for errorobject
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat(); // method creates a new array with all sub-array elements
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500: // // redirect user to server error component
        //  history('/server-error');
        // navigate('/server-error')
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);
const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};
const testErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get404Error: () => requests.get("buggy/not-found"),
  get500Error: () => requests.get("buggy/server-error"),
  getValidationError: () => requests.get("buggy/validation-error"),
};
const basket = {
  get:()=> requests.get('basket'),// in the get => We don't need to send up any parameters because it's going to be our cookie that is sent up automatically.
  addItem: (productId: number, quantity = 1)=> requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
  removeItem: (productId: number, quantity = 1)=> requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}
const agent = {
  Catalog,
  testErrors,
  basket
};
export default agent;
