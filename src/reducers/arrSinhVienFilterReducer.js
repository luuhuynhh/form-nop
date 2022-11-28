const defaultValue = '';

export const arrSinhVienFilter = (state = defaultValue, action) => {
    switch (action.type) {
        case 'LOC_SINH_VIEN': {
            return action.payload;
        }
        default: return state;
    }
}