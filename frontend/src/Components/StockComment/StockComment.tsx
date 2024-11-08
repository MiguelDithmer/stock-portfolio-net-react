import { toast } from "react-toastify";
import StockCommentForm from "./StockCommentForm/StockCommentForm"
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";
import { useState, useEffect } from "react";
import { CommentGet } from "../../Models/CommentPost";
import Spinner from "../Spinner/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";


type Props = {
    stockSymbol: string;
};

type CommentFormInputs = {
    title: string;
    content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
    const [comments, setComment] = useState<CommentGet[] | null>(null);
    const [loading, setLoading] = useState<boolean>();
    useEffect(() => {
        getComments();
    }, []);

    const handleComment = (e: CommentFormInputs) => {
        commentPostAPI(e.title, e.content, stockSymbol)
            .then((res) => {
                if (res) {
                    toast.success("Comment created successfully!");
                    getComments();

                }
            })
            .catch((e) => {
                toast.warning(e);
            });
    };
    const getComments = () => {
        setLoading(true);
        commentGetAPI(stockSymbol).then((res) => {
            setLoading(false);
            setComment(res?.data!);
        });
    };
    return (
        <div className="flex flex-col">
            {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
            <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
        </div>
    );
};
export default StockComment;