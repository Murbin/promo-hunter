import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setCategory, setStore, setProximity, resetFilters } from '../store/filtersSlice';
import { useGetStoresQuery } from '../store/api';
import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Slider,
    Button,
    Divider,
    Paper
} from '@mui/material';

export const SideFilters = () => {
    const dispatch = useDispatch();
    const { category, store, proximity } = useSelector((state: RootState) => state.filters);
    const { data: stores } = useGetStoresQuery();

    const categories = [
        "all",
        "men's clothing",
        "women's clothing",
        "jewelery",
        "electronics"
    ];

    return (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" gutterBottom>
                Filtros
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Categoría
                </Typography>
                <FormControl fullWidth size="small">
                    <Select
                        value={category}
                        onChange={(e) => dispatch(setCategory(e.target.value))}
                        displayEmpty
                    >
                        <MenuItem value="all">Todas las categorías</MenuItem>
                        {categories.filter(cat => cat !== 'all').map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Tienda
                </Typography>
                <FormControl fullWidth size="small">
                    <Select
                        value={store}
                        onChange={(e) => dispatch(setStore(e.target.value))}
                        displayEmpty
                    >
                        <MenuItem value="all">Todas las tiendas</MenuItem>
                        {stores?.map((store) => (
                            <MenuItem key={store.place_id} value={store.display_name}>
                                {store.display_name.split(',')[0]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Proximidad: {proximity}km
                </Typography>
                <Slider
                    value={proximity}
                    onChange={(_, value) => dispatch(setProximity(value as number))}
                    min={1}
                    max={10}
                    step={1}
                    marks
                    valueLabelDisplay="auto"
                />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Button
                variant="outlined"
                fullWidth
                onClick={() => dispatch(resetFilters())}
                sx={{ mt: 1 }}
            >
                Restablecer
            </Button>
        </Paper>
    );
}; 