import axios from "axios"; //Use axios for fetch data

//Load OP API from env
const API_URL = process.env.OP_API || "https://api.api-onepiece.com/v2";

export const getAllCharacters = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/characters/en`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch OP characters", error: error.message });
  }
};

export const getCharacterByCrew = async (req, res) => {
  try {
    //Fetch data from both endpoints simultaneously
    const [characterRes, crewRes] = await Promise.all([
      axios.get(`${API_URL}/characters/en`),
      axios.get(`${API_URL}/crews/en`),
    ]);

    const characters = characterRes.data;
    const crews = crewRes.data;

    const crewLookup = Object.fromEntries(crews.map((c) => [c.id, c.name]));

    const grouped = characters.reduce((acc, char) => {
      const crewName = crewLookup[char.crew_id];
      if (crewName) {
        if (!acc[crewName]) acc[crewName] = [];
        acc[crewName].push({
          id: char.id,
          name: char.name,
          job: char.job,
          bounty: char.bounty,
        });
      }
      return acc;
    }, {});
    res.status(200).json(grouped);
  } catch (error) {
    console.error("Error", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch OP crews", error: error.message });
  }
};
