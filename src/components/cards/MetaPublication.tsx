import Tags from "@/components/tags/Tags";
import moment from "moment";
import "moment/locale/fr";

export default function MetaPublication({
  metaPublication,
}: {
  metaPublication: {
    tags: { name: string; slug: string }[];
    date: string;
    displayAuthor: boolean;
    author: string;
  };
}) {
  const { tags, date, displayAuthor, author } = metaPublication;
  const fromNowFormat = moment(date).fromNow();
  const formattedDate = moment(date).format("DD MMM YYYY");

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-2 max-w-[80%]">
        <Tags tags={tags} sliced={true} truncated={true} />
      </div>
      <div className="min-w-max">
        <span className="text-sm text-text-secondary">
          {displayAuthor ? (
            <>
              Le {formattedDate}{" "}
              {author ? (
                <>
                  par <span className="underline">{author}</span>
                </>
              ) : null}
            </>
          ) : (
            fromNowFormat
          )}
        </span>
      </div>
    </>
  );
}
