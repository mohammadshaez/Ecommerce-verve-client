import axios from 'axios'

const TOKEN = "sk_test_51NdXdiSDQr8l4BQm4RGApZ6BeDBpjyHobPDhFcH60tHiJClGKQkng26mC8RyYRakShQDEZ78mhfMyzq1BOaowMT900h28Ujjku"

export const BASE_URL = "https://ecommercevervebackend.onrender.com/api/";
export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`},
})