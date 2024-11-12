import { useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  Chip,
} from '@mui/material';
import { AddOutlined, FavoriteBorderOutlined } from '@mui/icons-material';

export const PlaylistWidget = ({
  cover,
  title,
  owner,
  genres,
}: {
  cover: string | File;
  title: string;
  owner: string;
  genres: string[];
}) => {
  return (
    <Card
      sx={{
        width: '250px',
        height: '480px',
        backgroundColor: '#FEF7FF',
        borderRadius: '20px',
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        {typeof cover === 'string' ? (
          <Box
            component="img"
            src={cover}
            alt="Cover Image"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // marginBottom: '10px',
            }}
          />
        ) : null}
        <Box sx={{ padding: 2,  border: '1px solid red'}} >
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            {owner}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ padding: 2, border: '1px solid blue'}}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {genres.map((genre) => (
              <Chip key={genre} label={genre} size="small" />
            ))}
          </Stack>
        </Box>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'flex-end', marginTop: '10%', width: '100%', border: '1px solid green' }}
        >
          <FavoriteBorderOutlined></FavoriteBorderOutlined>
          <AddOutlined></AddOutlined>
        </Stack>
      </CardContent>
    </Card>
  );
};
