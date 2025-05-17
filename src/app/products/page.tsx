"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    ColumnDef,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Stack,
    Typography,
    Menu,
    MenuItem,
    Box,
    Paper,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DetailRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { flexRender } from "@tanstack/react-table";
import { useSnackbar } from "notistack";
import { baseUrl } from "@/constants/Constants";
import { useQuery } from "@tanstack/react-query";
import FilterBar from "@/components/filterbar/FilterBar";


const TableMyProducts: React.FC = () => {
    const router = useRouter();

    const [filters, setFilters] = useState({
        title: '',
        categoryId: '',
        priceMin: '',
        priceMax: ''
    });

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            const query = new URLSearchParams();
            if (filters.title) query.append('title', filters.title);
            if (filters.categoryId) query.append('categoryId', filters.categoryId);
            if (filters.priceMin) query.append('price_min', filters.priceMin);
            if (filters.priceMax) query.append('price_max', filters.priceMax);

            const res = await fetch(`${baseUrl}/products/?${query.toString()}`);
            return await res.json();
        },
    });

    const { enqueueSnackbar } = useSnackbar();

    const handleClickEdit = () => {
        enqueueSnackbar("Edit coming soon", { variant: "warning" });
    };

    const handleDetail = (id: string) => {
        router.push(`/products/${id}`);
    };


    const ActionMenu: React.FC<{ id: string }> = ({ id }) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <>
                <IconButton size="small" onClick={handleClick}>
                    <MenuRoundedIcon sx={{ color: "#7E7E7E" }} />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleDetail(id)}>
                        <DetailRoundedIcon className="mr-2 text-green-600" /> Detail
                    </MenuItem>
                    <MenuItem >
                        <EditRoundedIcon className="mr-2 text-blue-600" /> Edit
                    </MenuItem>
                    <MenuItem >
                        <DeleteRoundedIcon className="mr-2 text-[#D34053]" /> Delete
                    </MenuItem>
                </Menu>
            </>
        );
    };

    const columns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: "id",
                cell: (info) => {
                    const { id } = info.row.original;
                    return (
                        <Stack>
                            <Typography>{id}</Typography>
                        </Stack>
                    );
                },
            },
            {
                accessorKey: "images",
                cell: (info) => {
                    const { images, name } = info.row.original;
                    return (
                        <img src={images?.[0]} alt={`image-${name}`} width={72} height={72} />
                    );
                },
            },
            {
                accessorKey: "title",
                cell: (info) => {
                    const { title } = info.row.original;
                    return (
                        <Stack>
                            <Typography>{title}</Typography>
                        </Stack>
                    );
                },
            },
            {
                accessorKey: "category",
                header: "Kategori",
                cell: (info) => {
                    const { category } = info.row.original;
                    return (
                        <Stack>
                            <Typography>{category.name}</Typography>
                        </Stack>
                    );
                },
            },
            {
                accessorKey: "creationAt",
                header: "Created Date",
                cell: (info) => {
                    const { creationAt } = info.row.original;
                    const formatted = format(new Date(creationAt), "yyyy-MM-dd");

                    return (
                        <Stack>
                            <Typography>{formatted}</Typography>
                        </Stack>
                    );
                },
            },
            {
                accessorKey: "price",
                cell: (info) => {
                    const { price } = info.row.original;
                    return (
                        <Stack>
                            <Typography>$ {price}</Typography>
                        </Stack>
                    );
                },
            },
            {
                accessorKey: "actions",
                cell: (info) => <ActionMenu id={info.row.original.id} />,
            },
        ],
        []
    );

    const table = useReactTable({
        data: products,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 5 } },
    });

    const { pageSize, pageIndex } = table.getState().pagination;

    return (
        <>
            <FilterBar onFilter={setFilters} />
            {
                isLoading ? (<div>Loading...</div>) : (<>
                    <Box className="md:hidden space-y-4 px-4 py-6 bg-white">
                        {products.map((product: any) => (
                            <Paper
                                key={product.id}
                                elevation={2}
                                className="p-4 rounded-2xl shadow-sm border border-gray-200"
                            >
                                {/* Product Info */}
                                <Box className="flex gap-4 items-center">
                                    <Box className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                                        <img
                                            src={product.images?.[0]}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </Box>

                                    <Box>
                                        <Typography variant="subtitle1" className="font-semibold text-gray-800">
                                            {product.title}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-500">
                                            {product.category?.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-sm text-gray-600 mt-1 font-medium">
                                            $ {product.price}
                                        </Typography>
                                        <Typography variant="caption" className="text-gray-400 mt-1 block">
                                            {format(new Date(product.creationAt), "yyyy-MM-dd")}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Actions */}
                                <Box className="flex justify-end mt-4 gap-2">
                                    <IconButton size="small" onClick={() => enqueueSnackbar("Detail coming soon")}>
                                        <DetailRoundedIcon className="text-green-600" fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={handleClickEdit}>
                                        <EditRoundedIcon className="text-blue-600" fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => enqueueSnackbar("Delete coming soon")}>
                                        <DeleteRoundedIcon className="text-[#D34053]" fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Paper>
                        ))}
                    </Box>

                    <Box className="hidden md:block bg-[#f0f2f5] min-h-screen py-10 px-4 bg-white">
                        <Paper
                            elevation={3}
                            sx={{
                                maxWidth: 1100,
                                margin: "auto",
                                overflow: "hidden",
                                borderRadius: 3,
                            }}
                        >
                            <Box className="p-6 border-b border-gray-200">
                                <Typography variant="h6" className="text-gray-800 font-semibold">
                                    Product List
                                </Typography>
                            </Box>

                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id} className="bg-[#F7F9FC]">
                                                {headerGroup.headers.map((header) => (
                                                    <TableCell key={header.id} className="font-semibold capitalize text-sm text-gray-600">
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHead>
                                    <TableBody>
                                        {table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id} hover>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="text-sm text-gray-700">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box className="border-t border-gray-200 px-4 py-2 flex justify-end">
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: products.length }]}
                                    component="div"
                                    count={products.length}
                                    rowsPerPage={pageSize}
                                    page={pageIndex}
                                    onPageChange={(_, page) => table.setPageIndex(page)}
                                    onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value) || 10)}
                                />
                            </Box>
                        </Paper>
                    </Box>
                </>
                )}


        </>
    );
}

export default TableMyProducts;
