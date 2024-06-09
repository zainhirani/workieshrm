import React from "react";
import { Box, Link, Stack, Typography } from "@mui/material";

interface NewsFeedProps {
  title: string;
  image: string;
  description: string;
  postedAt: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({
  title,
  image,
  description,
  postedAt,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {postedAt}
      </Typography>
    </Stack>
  );
};

export default NewsFeed;
