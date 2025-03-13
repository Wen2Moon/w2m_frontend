import { useTranslation } from "next-i18next";
import imageFeature1 from "../../../public/images/feature/feature1.svg";
import imageFeature2 from "../../../public/images/feature/feature2.svg";
import imageFeature3 from "../../../public/images/feature/feature3.svg";
import imageFeature4 from "../../../public/images/feature/feature4.svg";
import imageFeature5 from "../../../public/images/feature/feature5.svg";
import imageFeature6 from "../../../public/images/feature/feature6.svg";
import imageFeature7 from "../../../public/images/feature/feature7.svg";
import imageFeature8 from "../../../public/images/feature/feature8.svg";
import imageFeature9 from "../../../public/images/feature/feature9.svg";
import imageFeature10 from "../../../public/images/feature/feature10.svg";

const FerchDataFunction = () => {
  const { t } = useTranslation("common");

  const itemListFeature = [
    {
      id: 1,
      title: t("title_feature1"),
      image: imageFeature1,
      description: t("description_feature1"),
      maxWidth: "240px",
      link: "https://athene.network/foundation",
      subTitle: ""
    },
    {
      id: 2,
      title: t("title_feature2"),
      image: imageFeature2,
      description: t("description_feature2"),
      maxWidth: "240px",
      link: "https://game.athene.network",
      subTitle: ""
    },
    {
      id: 3,
      title: t("title_feature3"),
      image: imageFeature3,
      description: t("description_feature3"),
      maxWidth: "240px",
      link: "https://launch.athene.network",
      subTitle: ""
    },
    {
      id: 4,
      title: t("title_feature4"),
      image: imageFeature4,
      description: t("description_feature4"),
      maxWidth: "220px",
      link: "",
      subTitle: ""
    },
    {
      id: 5,
      title: t("title_feature5"),
      image: imageFeature5,
      description: t("description_feature5"),
      maxWidth: "225px",
      link: "",
      subTitle: ""
    },
    {
      id: 6,
      title: t("title_feature6"),
      image: imageFeature6,
      description: t("description_feature6"),
      maxWidth: "266px",
      link: "https://athene.network/download",
      subTitle: ""
    },
    {
      id: 7,
      title: t("title_feature7"),
      image: imageFeature7,
      description: t("description_feature7"),
      maxWidth: "250px",
      link: "https://p2p.athene.network",
      subTitle: t("sub_title7")
    },
    {
      id: 8,
      title: t("title_feature8"),
      image: imageFeature8,
      description: t("description_feature8"),
      maxWidth: "225px",
      link: "https://shop.athene.network/",
      subTitle: ""
    },
    {
      id: 9,
      title: t("title_feature9"),
      image: imageFeature9,
      description: t("description_feature9"),
      maxWidth: "240px",
      link: "",
      subTitle: ""
    },
    {
      id: 10,
      title: t("title_feature10"),
      image: imageFeature10,
      description: t("description_feature10"),
      maxWidth: "230px",
      link: "https://atheex.com",
      subTitle: ""
    },
  ];

  const listTermsAndCoditions = [
    {
      id: 1,
      title: t("term_and_codition_1"),
      lists: [
        t("sub_term_and_codition_1_1"),
        t("sub_term_and_codition_1_2")
      ],
    },
    {
      id: 2,
      title: t("term_and_codition_2"),
      lists: [
        t("sub_term_and_codition_2_1"),
        t("sub_term_and_codition_2_2"),
        t("sub_term_and_codition_2_3"),
      ],
    },
    {
      id: 3,
      title: t("term_and_codition_3"),
      lists: [
        t("sub_term_and_codition_3_1"),
        t("sub_term_and_codition_3_2"),
      ],
    },
    {
      id: 4,
      title: t("term_and_codition_4"),
      lists: [
        t("sub_term_and_codition_4_1"),
        t("sub_term_and_codition_4_2"),
      ],
    },
    {
      id: 5,
      title: t("term_and_codition_5"),
      lists: [
        t("sub_term_and_codition_5_1"),
        t("sub_term_and_codition_5_2"),
      ],
    },
    {
      id: 6,
      title: t("term_and_codition_6"),
      lists: [
        t("sub_term_and_codition_6_1"),
        t("sub_term_and_codition_6_2"),
      ],
    },
    {
      id: 7,
      title: t("term_and_codition_7"),
      lists: [
        t("sub_term_and_codition_7_1"),
      ],
    },
  ];

  return { itemListFeature, listTermsAndCoditions };
};

export default FerchDataFunction;
