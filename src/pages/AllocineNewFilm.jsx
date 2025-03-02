import React from 'react';
import { useAxios } from "../helpers/axios-hook";
import * as constants from "../helpers/constants";
import { useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useStompjs } from "../helpers/stompjs-hook";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const paginatedSearchUrl = constants.allocinePaginatedSearch

const AllocineNewFilm = () => {
    const [post, setPost] = useState(null);
    const { axiosAllocineInstance, initialized } = useAxios(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [count, setCount] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 50))
        setPage(0);
    };
    const [newFilter, setNewFilter] = useState('');
    const [newSort, setNewSort] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { stompInitialized, client, message } = useStompjs(false);
    useEffect(() => {
        if (!initialized) {
            return;
        }
        const fetchData = async () => {
            setLoading(true)
            setError(false)
            try {
                let response = await axiosAllocineInstance.allocine_instance.get(paginatedSearchUrl, {
                    timeout: 2500,
                    params: {
                        query: newFilter ? newFilter : constants.allocineDefaultQuery,
                        sort: newSort ? newSort : constants.allocineDefaultSort,
                        offset: page + 1,
                        limit: rowsPerPage
                    }
                });
                console.log(response.data.content)
                setPost(response.data.content);
                setCount(response.data.totalElements)
                setError(false)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setError(true)
                setLoading(false)
            }
        }
        fetchData()

    }, [initialized, page, rowsPerPage, newFilter, newSort]);
};

export default AllocineNewFilm;