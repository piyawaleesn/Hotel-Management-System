import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";

function SearchAdmin({ value, onChange }) {
  return (
    <div>
      <FormControl>
        <OutlinedInput
          value={value}
          onChange={onChange}
          placeholder="Search…"
          size="small"
          color="warning"
          id="input-with-icon-adornment"
          inputProps={{
            "aria-label": "weight",
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}

export default SearchAdmin;
