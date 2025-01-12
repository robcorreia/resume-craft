type ResumeImageData = {
    url: string;
    visible: boolean;
}

type ResumeInfosData = {
    fullName: string;
    headline: string;
    website: string;
    phone: string;
    location: string;
}

type ResumeContentData = {
    image: ResumeImageData;
    infos: ResumeInfosData;
}

type ResumeData = {
    content: ResumeContentData;
    // structure: ResumeStructureData;
}