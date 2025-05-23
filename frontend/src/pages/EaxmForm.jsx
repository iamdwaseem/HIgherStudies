import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../App.css";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import FormHeader from "../components/FormHeader";
import File from "../components/File";

export default function ExamForm() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    exam: "",
    regNo: "",
    passedOutYear: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUnSuccessAltert, setUnShowSuccessAlert] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/higherStudies/storeExamData",
        { ...formData }
      );
      res = response;

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        setShowSuccessAlert(true);
        setFormData({
          name: "",
          rollNo: "",
          passedOutYear: "",
          exam: "",
          regNo: "",
        });
        setTimeout(() => setShowSuccessAlert(false), 3000);
      } else {
        setUnShowSuccessAlert(true);
        setTimeout(() => setUnShowSuccessAlert(false), 3000);
      }
    } catch (error) {
      setUnShowSuccessAlert(true);
      setTimeout(() => setUnShowSuccessAlert(false), 3000);
    }
  };

  return (
    <div>
      <FormHeader />
      <Box
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Container maxWidth="sm" sx={{ mt: 1 }}>
          {/* Success Alert */}
          <Slide
            direction="down"
            in={showSuccessAlert}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                position: "fixed",
                top: 20,
                left: "40%",
                transform: "translateX(-50%)",
                zIndex: 9999,
              }}
            >
              <Alert variant="filled" severity="success">
                Data Submitted Successfully!
              </Alert>
            </Box>
          </Slide>

          {/* Error Alert */}
          <Slide
            direction="down"
            in={showUnSuccessAltert}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                position: "fixed",
                top: 20,
                left: "40%",
                transform: "translateX(-50%)",
                zIndex: 9999,
              }}
            >
              <Alert variant="filled" severity="error">
                Error In Submitng Data!
              </Alert>
            </Box>
          </Slide>

          {/* Form Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "maroon",
              whiteSpace: "nowrap",
              overflowX: "auto",
              textOverflow: "ellipsis",
              fontWeight: 600,
              textAlign: "center",
              mb: 3,
            }}
            className="font"
          >
            Student Competitive Exam Form
          </Typography>

          {/* Form Box */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "#fafafa",
              padding: 4,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
            className="formstyle"
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Roll Number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Passed Out Year"
              name="passedOutYear"
              value={formData.passedOutYear}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl size="small" fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-select-small-label" sx={{ mt: 1 }}>
                Exam Type
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={formData.exam}
                label="Exam Type"
                name="exam"
                onChange={handleChange}
                fullWidth
                sx={{ height: 53 }}
              >
                <MenuItem value={"GATE"}>GATE</MenuItem>
                <MenuItem value={"GRE"}>GRE</MenuItem>
                <MenuItem value={"IELTS"}>IELTS</MenuItem>
                <MenuItem value={"TOEFL"}>TOEFL</MenuItem>
                <MenuItem value={"DUOLINGO"}>DUOLINGO</MenuItem>
                <MenuItem value={"PTE"}>PTE</MenuItem>
                <MenuItem value={"MAT"}>MAT</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Registration Number"
              name="regNo"
              type="text"
              value={formData.regNo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ mt: 3 }}
            />
            <File />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "maroon",
                "&:hover": { backgroundColor: "#800000" },
                fontWeight: 600,
              }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
