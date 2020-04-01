export function createControl(config,validation){
    return {
        ...config,
        validation,
        valid:!validation,
        error:false,
        value: '',
        helperText : ''
    }
}