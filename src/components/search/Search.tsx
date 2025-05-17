"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { TextField, MenuItem, Select, InputAdornment } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const statuses = ["All", "Paid", "Unpaid", "Pending"];

const SearchFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "All";

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== "All") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex gap-4">
            <TextField
                variant="standard"
                placeholder="Search"
                className="bg-white border-none rounded-xl justify-center h-[40px] w-[200px]"
                fullWidth
                value={search}
                onChange={(e) => updateQuery("search", e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start" className="ml-3 border-none ">
                                <SearchRoundedIcon
                                    className="text-gray-400"
                                    fontSize="medium"
                                />
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                        className: "text-[#7E7E7E]",
                    },
                }}
            />

            <Select
                value={status}
                variant="standard"
                className="bg-white text-[#7E7E7E] border-none rounded-xl justify-center h-[40px] w-[135px] px-4 text-xs no-underline"
                onChange={(e) => updateQuery("status", e.target.value)}
                sx={{
                    "&:before, &:after": { display: "none" },
                }}
                displayEmpty
            >
                {statuses.map((s) => (
                    <MenuItem key={s} value={s}>
                        {s}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default SearchFilter;
