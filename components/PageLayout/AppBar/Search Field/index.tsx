import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FormattedMessage, { useFormattedMessage } from "theme/FormattedMessage";
import messages from "./messages";
import { Search, SearchIconWrapper, StyledInputBase } from "./Styled";

const SearchField = () => {
  const searchPlaceholder = useFormattedMessage(messages.placeholder);
  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase placeholder={searchPlaceholder} />
      </Search>
    </>
  );
};

export default SearchField;
