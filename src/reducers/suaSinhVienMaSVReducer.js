const defaultValue = '';

export const suaSinhVienMaSV = (state = defaultValue, action) => {
    switch (action.type) {
        case 'THONG_TIN_SINH_VIEN': {
            return action.payload;
        }
        default: return state;
    }
}