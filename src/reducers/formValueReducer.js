const defaultValue = [
    {
        maSV: '19120573',
        hoTen: 'Huỳnh Huỳnh',
        sdt: '0357022566',
        email: 'huynh.huynh@gmail.com'
    },
    {
        maSV: '19120160',
        hoTen: 'Ý Ý',
        sdt: '0357022566',
        email: 'y.y@gmail.com'
    }
]

export const arrSinhVien = (state = defaultValue, action) => {
    switch (action.type) {
        case 'THEM_SINH_VIEN': {
            state.push(action.payload);
            return [...state];
        }
        case 'SUA_SINH_VIEN': {
            console.log('SUA');
            let index = state.findIndex(item => item.maSV === action.payload.maSV);
            console.log(index);
            state.splice(index, 1, action.payload);
            return [...state];
        }
        case 'XOA_SINH_VIEN': {
            let arr = state.filter(item => item.maSV !== action.payload);
            return [...arr];
        }
        default: return state;
    }
}