import Box from '@mui/material/Box';

const NameFormatter = ({ map }) => {
    return (
        <Box sx={{ flexGrow: 1 }} >
        {
            map.map((p, index) => (
                <div key={index}>{p.nom}</div>
            ))
        }
        </Box>
    );
};
   
export default NameFormatter;