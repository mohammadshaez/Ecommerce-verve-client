import {css} from 'styled-components';

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 500px) {
            ${props}
        }
    `
}

export const tablet = (props) => {
    return css`
        @media only screen and (max-width: 768px) {
            ${props}
        }
    `
}

export const middle = (props) => {
    return css`
        @media only screen and (max-width: 900px) {
            ${props}
        }
    `
}