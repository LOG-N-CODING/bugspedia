import { Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { sampleInsects } from "../data/sampleInsects";
import Layout from "../Layout";
import { InsectCardData } from "../types/Insect";

const ITEMS_PER_PAGE = 6;

const Encyclopedia: React.FC = () => {
  const [insects, setInsects] = useState<InsectCardData[]>([]);
  const [filteredInsects, setFilteredInsects] = useState<InsectCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [rarity, setRarity] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchInsects = async () => {
      try {
        // Replace this with actual Firestore fetch if needed
        setInsects(sampleInsects);
        setFilteredInsects(sampleInsects);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch insect cards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsects();
  }, []);

  useEffect(() => {
    const filtered = insects.filter(
      (insect) =>
        insect.name.toLowerCase().includes(search.toLowerCase()) &&
        (rarity === "all" || insect.rarity === rarity)
    );
    setFilteredInsects(filtered);
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination when filter changes
  }, [search, rarity, insects]);

  const visibleInsects = filteredInsects.slice(0, visibleCount);

  return (
    <Layout>
      <Box sx={{ textAlign: "center", mb: 5, textShadow: "4px 4px 4px #b9f6ca" }}>
        <motion.div
          initial={{ rotate: -1, scale: 1 }}
          animate={{ rotate: [ -2, 2, -2 ], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color="success.dark"
            gutterBottom
            sx={{ letterSpacing: 2 }}
          >
            🐞 Your Insect Encyclopedia 🦋
          </Typography>
        </motion.div>

        <Typography variant="subtitle1" color="text.secondary">
          Discover and collect unique insects from all habitats!
        </Typography>
      </Box>

      <Grid container spacing={2} mb={4} justifyContent={"center"}>
        <Grid>
          <TextField
            sx={{ width: 400 }}
            placeholder="Search insects..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid>
          <TextField
            select
            sx={{ width: 200 }}
            label="Filter by Rarity"
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="common">Common</MenuItem>
            <MenuItem value="rare">Rare</MenuItem>
            <MenuItem value="epic">Epic</MenuItem>
            <MenuItem value="legendary">Legendary</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress color="success" />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : filteredInsects.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No matching cards found.
        </Typography>
      ) : (
        <>
          <Grid container spacing={6} justifyContent="center">
            {visibleInsects.map((insect) => (
              <Grid key={insect.id}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      boxShadow: 4,
                      width: 350,
                    }}
                    onClick={() => {
                      // Handle card click if needed
                      console.log(`Clicked on ${insect.name}`);
                      // google search it
                      window.open(
                        `https://www.google.com/search?q=${insect.name}`,
                        "_blank"
                      );
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="180"
                        image={insect.image}
                        alt={insect.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent style={{ backgroundColor: "#f1f8e9" }}>
                        <Typography variant="h6" color="success.main">
                          {insect.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Habitat: {insect.habitat}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {insect.description}
                        </Typography>
                        {insect.rarity && (
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 1,
                              display: "inline-block",
                              color:
                                insect.rarity === "legendary"
                                  ? "gold"
                                  : insect.rarity === "epic"
                                  ? "mediumorchid"
                                  : insect.rarity === "rare"
                                  ? "dodgerblue"
                                  : "gray",
                            }}
                          >
                            Rarity: {insect.rarity}
                          </Typography>
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {visibleCount < filteredInsects.length && (
            <Box display="flex" justifyContent="center" mt={4}>
              <CardActionArea
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 3,
                  backgroundColor: "success.main",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: 200,
                  "&:hover": {
                    backgroundColor: "success.dark",
                  },
                }}
              >
                Load More
              </CardActionArea>
            </Box>
          )}
        </>
      )}
    </Layout>
  );
};

export default Encyclopedia;
