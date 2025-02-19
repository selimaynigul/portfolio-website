import Card from "components/Card";
import Tag from "components/Tag";

const WorkCard: React.FC<{ work: any }> = ({ work }) => {
  return (
    <Card>
      <div>
        <strong>{work.role}</strong> •{" "}
        <span style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          {work.company}
        </span>
        <span
          style={{
            float: "right",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          {work.startDate} - {work.endDate}
        </span>
      </div>
      <p>{work.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {work.tags.map((tag: any) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Card>
  );
};

export default WorkCard;
