import {Box, Button, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getFinalForm, getOrder} from "../../redux/selectors/basketSelectors";
import {FormContainer} from "./FormContainer";
import {Form} from "./Form";
import {Input} from "./Input";
import React, {useEffect} from "react";
import {PrimaryButton} from "./PromaryButton";
import {actions} from "../../redux/basketReducer";
import {postOrder} from "../../redux/bookReducer";
import Swal from "sweetalert2";
import {getErrors, getOrderId} from "../../redux/selectors/mainSelectors";

const schema = yup.object().shape({
    firstName: yup
        .string()
        .min(4)
        .max(50)
        .matches(/^([^0-9])*$/, "Pole musi być poprawnie wypełnione")
        .required("To pole jest obowiązkowe"),
    lastName: yup
        .string()
        .min(5)
        .max(50)
        .matches(/^([^0-9])*$/, "Pole musi być poprawnie wypełnione")
        .required("To pole jest obowiązkowe"),
    city: yup
        .string()
        .matches(/^([^0-9])*$/, "Pole musi być poprawnie wypełnione")
        .required("To pole jest obowiązkowe"),
    zipCode: yup
        .string()
        .matches(/^[0-9]{2}-[0-9]{3}$/, "Pole musi być poprawnie wypełnione")
        .required("To pole jest obowiązkowe"),
})


export const FinalFrom = () => {
    const getForm = useSelector(getFinalForm)
    const getOrderData = useSelector(getOrder)
    const getError = useSelector(getErrors)
    const idOrder = useSelector(getOrderId)

    const dispatch = useDispatch()

    const history = useHistory()
    const onBack = () => {
        history.push('/basket')
    }

    useEffect(() => {
        const {city,zip_code,last_name,first_name} = getForm
        if(!city && !zip_code && !last_name && !first_name)return
        if(!getOrderData) return
        if(!getOrderData.length)return

        const data = {
            order: getOrderData,
            first_name,
            last_name,
            city,
            zip_code
        }
        dispatch(postOrder(data))

    },[getForm,getOrderData])
    useEffect(()=> {
        if(getError){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: getError,
            })
            return
        }
        if(idOrder){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `zamówienie ${idOrder}`,
                showConfirmButton: false,
                timer: 4000
            })

            dispatch(actions.clearBasket())
            dispatch(actions.clearOrder())
            dispatch(actions.sendForm({zip_code: '',city:'',last_name:'',first_name:''}))
            history.push('/')
        }
    },[idOrder,getError])

    const {register, handleSubmit,formState: { errors }} = useForm({
        defaultValues: {firstName: getForm.first_name, lastName: getForm.last_name, city: getForm.city, zipCode: getForm.zip_code},
        mode: "onBlur",
        resolver: yupResolver(schema)

    })



    const onSubmit = (data: DataType): void => {
        if (!getOrderData){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Koszyk jest pusty!',
            })
            return
        }
        dispatch(actions.sendForm({first_name:data.firstName, last_name:data.lastName,
        zip_code:data.zipCode, city:data.city}))
    }
    return (
        <FormContainer>
            <Typography
                component="h2"
                variant="h5"
            >
                Wypełnij dane
            </Typography>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Input
                    {...register('firstName')}
                    id="firsName"
                    type="text"
                    label="Imię"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message}

                />
                <Input
                    {...register('lastName')}
                    id="lastName"
                    type="text"
                    label="Nazwisko"
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message}
                />
                <Input
                    {...register('city')}
                    id="city"
                    type="text"
                    label="Miasto"
                    error={!!errors.city}
                    helperText={errors?.city?.message}
                />
                <Input
                    {...register('zipCode')}
                    id="zipCode"
                    type="text"
                    label="Kod pocztowy"
                    error={!!errors.zipCode}
                    helperText={errors?.zipCode?.message}
                />
                <PrimaryButton>Złóż zamówienie</PrimaryButton>
            </Form>
            <Box component="span" m={2}>
                <Button
                    onClick={onBack}
                    variant='contained'
                    size='small'
                    color='secondary'
                >
                    powrót
                </Button>
            </Box>
        </FormContainer>
    )
}
type DataType = {
    firstName: string
    lastName: string
    city: string
    zipCode: string
}
