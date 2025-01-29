declare const awsmobile: {
  aws_project_region: string;
  aws_cognito_identity_pool_id?: string;
  aws_cognito_region: string;
  aws_user_pools_id: string;
  aws_user_pools_web_client_id: string;
  oauth?: {
    domain?: string;
    scope?: string[];
    redirectSignIn?: string;
    redirectSignOut?: string;
    responseType?: string;
  };
};

export default awsmobile;
