import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react"
import { searchCompanies } from "../../api"
import { CompanySearch } from "../../Company"
import CardList from "../../Components/CardList/CardList"
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio"
import Search from "../../Components/Search/Search"
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from "../../Services/PortfolioService"
import { toast } from "react-toastify"
import { PortfolioGet } from "../../Models/Portfolio"

type Props = {}

const SearchPage = (props: Props) => {
    const [search, setSearch] = useState<string>("");
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);

    useEffect(() => {
        getPortfolio();
    }, []);

    const getPortfolio = () => {
        portfolioGetAPI()
            .then((res) => {
                if (res?.data) {
                    setPortfolioValues(res?.data);
                }
            })
            .catch((e) => {
                setPortfolioValues(null);
            });
    };
    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        portfolioAddAPI(e.target[0].value)
            .then((res) => {
                if (res?.status === 204) {
                    toast.success("Stock added to portfolio!");
                    getPortfolio();
                }
            })
            .catch((e) => {
                toast.warning("Could not add stock to portfolio!");
            });
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        portfolioDeleteAPI(e.target[0].value).then((res) => {
            if (res?.status == 200) {
                toast.success("Stock deleted from portfolio!");
                getPortfolio();
            }
        });
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        //setServerError(result.data);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
    };
    return (
        <div>
            <Search onSearchSubmit={onSearchSubmit}
                search={search}
                handleSearchChange={handleSearchChange} />
            <ListPortfolio
                portfolioValues={portfolioValues!}
                onPortfolioDelete={onPortfolioDelete}
            />
            <CardList
                searchResults={searchResult}
                onPortfolioCreate={onPortfolioCreate}
            />      {serverError && <div>Unable to connect to API</div>}
        </div>
    )
}

export default SearchPage