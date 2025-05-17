import { TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { baseUrl } from "@/constants/Constants";
import { useQuery } from "@tanstack/react-query";

const FilterBar = ({ onFilter }: { onFilter: any }) => {
    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");

    const debouncedFilter = useMemo(() => debounce(onFilter, 500), [onFilter]);

    useEffect(() => {
        debouncedFilter({ title, categoryId, priceMin, priceMax });
        return debouncedFilter.cancel;
    }, [title, categoryId, priceMin, priceMax]);

    const { isPending: isPendingCategories, data: categories, } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await fetch(
                `${baseUrl}/categories`,
            )
            return await response.json()
        },
    })


    const handleClear = () => {
        setTitle("");
        setCategoryId("");
        setPriceMin("");
        setPriceMax("");
        onFilter({ title: "", categoryId: "", priceMin: "", priceMax: "" });
    };

    return (
        <Paper
            className="p-4 rounded-md justify-center flex "
        >
            <Grid container spacing={2} alignItems="center" sx={{ maxWidth: '1100px' }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }} >
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl fullWidth size="small" className="min-w-[150px]">
                        <InputLabel id="category-select-label">Category</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={categoryId}
                            label="Category"
                            onChange={(e) => setCategoryId(e.target.value)}
                            disabled={isPendingCategories}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories?.map((cat: any) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField
                        label="Price Min"
                        type="number"
                        fullWidth
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 6, md: 2 }}>
                    <TextField
                        label="Price Max"
                        type="number"
                        fullWidth
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        size="small"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 2 }}>
                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => onFilter({ title, categoryId, priceMin, priceMax })}
                            variant="contained"
                            color="success"

                            size="small"
                        >
                            Filter
                        </Button>
                        <Button
                            onClick={handleClear}
                            variant="outlined"
                            color="success"
                            size="small"
                        >
                            Clear
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FilterBar