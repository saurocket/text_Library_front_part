import React, {FormEvent, useState,} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import {IconButton} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux";
import {statusLoading} from '../../../redux/selectors/mainSelectors'
import {Preloader} from "../../assets/Preloader";
import { actions } from '../../../redux/bookReducer'

type PropsType = {
    titleR: string,
    authorR: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginRight: 'auto',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            '& > *': {
                marginBottom: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: '40ch',
            },
        },
        buttonSubmit: {
            width: '5ch',
        },
        rightContainer: {
            width: '5ch',
        }

    }),
);
export const SearchFormFilter:React.FC<PropsType> = ({titleR,authorR}) => {
    const classes = useStyles()
    const loading = useSelector(statusLoading)

    const dispatch = useDispatch()
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (author.trim() || title.trim()){
            dispatch(actions.updateQueryStatus({author:author.trim(), title: title.trim(), page: 1}))
        }
    }
    const [author, setAuthor] = useState(authorR)
    const [title, setTitle] = useState(titleR)

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
            <TextField
                disabled={loading}
                id="searchTitle"
                label="Nazwa książeczki"
                variant="outlined"
                value={title}
                onChange={(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setTitle(e.target.value)
                }}
            />
            <TextField
                disabled={loading}
                id="searchAuthor"
                label="Autor"
                variant="outlined"
                value={author}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setAuthor(e.target.value)
                }}
            />
            <div className={classes.buttonSubmit}>
                {loading ? <Preloader/> :
                    <IconButton
                        aria-label="search"
                        type='submit'
                    >
                        <SearchIcon fontSize="large" color='primary'/>
                    </IconButton>
                }
            </div>


        </form>
    )
}