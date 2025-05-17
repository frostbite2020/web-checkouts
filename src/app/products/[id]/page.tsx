'use client'

import { baseUrl } from '@/constants/Constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

const ProductDetail = () => {
    const router = useRouter();

    const params = useParams();
    const id = params?.id;

    const { data, isLoading, error } = useQuery({
        queryKey: ["produk", id],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/products/${id}`);
            return await response.json();
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-8">
                Something went wrong when fetching data.
            </div>
        );
    }

    return (
        <Container maxWidth="lg" className="py-8 px-4">
            <Box className="mb-6">
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIosNewIcon />}
                    onClick={() => router.push('/products')}
                    className="text-sm"
                    style={{ color: '#16A34A', borderColor: '#16A34A' }}
                >
                    Back to List
                </Button>
            </Box>

            <Grid container spacing={6}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                        <img
                            src={data?.images?.[0]}
                            alt={data?.title}
                            className="w-full h-auto max-h-[500px] object-cover"
                        />
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} className="space-y-4">
                    <Typography variant="h4" className="font-semibold text-gray-800">
                        {data?.title}
                    </Typography>

                    <Typography variant="body1" className="text-gray-600">
                        <strong>Category:</strong> {data?.category?.name}
                    </Typography>

                    <Typography variant="body1" className="text-gray-600">
                        <strong>Price:</strong> ${data?.price}
                    </Typography>

                    <Typography variant="body1" className="text-gray-700">
                        <strong>Description:</strong><br />
                        {data?.description}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
