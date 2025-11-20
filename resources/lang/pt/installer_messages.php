<?php

return [

    /**
     *
     * Shared translations.
     *
     */
    'title' => 'Eventmie Pro 3.0 Assistente de Instalação',
    'next' => 'Próxima Etapa',
    'back' => 'Anterior',
    'finish' => 'Instalar',
    'forms' => [
        'errorTitle' => 'Os seguintes erros ocorreram:',
    ],

    /**
     *
     * Home page translations.
     *
     */
    'welcome' => [
        'templateTitle' => 'Bem-vindo',
        'title'   => 'Eventmie Pro 3.0 Assistente de Instalação',
        'message' => 'Assistente Fácil de Instalação e Configuração.',
        'next'    => 'Etapa 1: Verificar Requisitos',
    ],

    /**
     *
     * Requirements page translations.
     *
     */
    'requirements' => [
        'templateTitle' => 'Etapa 1 | Requisitos do Servidor',
        'title' => 'Requisitos do Servidor',
        'next'    => 'Etapa 2: Verificar Permissões',
    ],

    /**
     *
     * Permissions page translations.
     *
     */
    'permissions' => [
        'templateTitle' => 'Etapa 2 | Permissões',
        'title' => 'Permissões',
        'next' => 'Etapa 3: Configurar Ambiente',
    ],

    /**
     *
     * Environment page translations.
     *
     */
    'environment' => [
        'menu' => [
            'templateTitle' => 'Etapa 3 | Configurações de Ambiente',
            'title' => 'Configurações de Ambiente',
            'desc' => 'Por favor, selecione como deseja configurar o arquivo <code>.env</code> da aplicação.',
            'wizard-button' => 'Etapa 4: Assistente de Configuração (recomendado)',
            'classic-button' => 'Editor de Texto Clássico',
        ],
        'wizard' => [
            'templateTitle' => 'Etapa 3 | Configurações de Ambiente | Assistente Guiado',
            'title' => 'Assistente Guiado <code>.env</code>',
            'tabs' => [
                'environment' => 'Ambiente',
                'database' => 'Banco de Dados',
                'application' => 'Aplicação'
            ],
            'form' => [
                'name_required' => 'Um nome de ambiente é obrigatório.',
                'app_name_label' => 'Nome da Aplicação',
                'app_name_placeholder' => 'Nome da Aplicação',
                'app_environment_label' => 'Ambiente da Aplicação',
                'app_environment_label_local' => 'Local',
                'app_environment_label_developement' => 'Desenvolvimento',
                'app_environment_label_qa' => 'QA',
                'app_environment_label_production' => 'Produção',
                'app_environment_label_other' => 'Outro',
                'app_environment_placeholder_other' => 'Digite seu ambiente...',
                'app_debug_label' => 'Debug da Aplicação',
                'app_debug_label_true' => 'Verdadeiro',
                'app_debug_label_false' => 'Falso',
                'app_log_level_label' => 'Nível de Log da Aplicação',
                'app_log_level_label_debug' => 'debug',
                'app_log_level_label_info' => 'info',
                'app_log_level_label_notice' => 'notice',
                'app_log_level_label_warning' => 'warning',
                'app_log_level_label_error' => 'error',
                'app_log_level_label_critical' => 'critical',
                'app_log_level_label_alert' => 'alert',
                'app_log_level_label_emergency' => 'emergency',
                'app_url_label' => 'URL da Aplicação',
                'app_url_placeholder' => 'URL da Aplicação',
                'db_connection_label' => 'Conexão do Banco de Dados',
                'db_connection_label_mysql' => 'mysql',
                'db_connection_label_sqlite' => 'sqlite',
                'db_connection_label_pgsql' => 'pgsql',
                'db_connection_label_sqlsrv' => 'sqlsrv',
                'db_host_label' => 'Host do Banco de Dados',
                'db_host_placeholder' => 'Host do Banco de Dados',
                'db_port_label' => 'Porta do Banco de Dados',
                'db_port_placeholder' => 'Porta do Banco de Dados',
                'db_name_label' => 'Nome do Banco de Dados',
                'db_name_placeholder' => 'Nome do Banco de Dados',
                'db_username_label' => 'Usuário do Banco de Dados',
                'db_username_placeholder' => 'Usuário do Banco de Dados',
                'db_password_label' => 'Senha do Banco de Dados',
                'db_password_placeholder' => 'Senha do Banco de Dados',

                'app_tabs' => [
                    'more_info' => 'Mais Informações',
                    'broadcasting_title' => 'Broadcasting, Cache, Sessão e Fila',
                    'broadcasting_label' => 'Driver de Broadcast',
                    'broadcasting_placeholder' => 'Driver de Broadcast',
                    'cache_label' => 'Driver de Cache',
                    'cache_placeholder' => 'Driver de Cache',
                    'session_label' => 'Driver de Sessão',
                    'session_placeholder' => 'Driver de Sessão',
                    'queue_label' => 'Driver de Fila',
                    'queue_placeholder' => 'Driver de Fila',
                    'redis_label' => 'Driver Redis',
                    'redis_host' => 'Host Redis',
                    'redis_password' => 'Senha Redis',
                    'redis_port' => 'Porta Redis',

                    'mail_label' => 'Email',
                    'mail_driver_label' => 'Driver de Email',
                    'mail_driver_placeholder' => 'Driver de Email',
                    'mail_host_label' => 'Host de Email',
                    'mail_host_placeholder' => 'Host de Email',
                    'mail_port_label' => 'Porta de Email',
                    'mail_port_placeholder' => 'Porta de Email',
                    'mail_username_label' => 'Usuário de Email',
                    'mail_username_placeholder' => 'Usuário de Email',
                    'mail_password_label' => 'Senha de Email',
                    'mail_password_placeholder' => 'Senha de Email',
                    'mail_encryption_label' => 'Criptografia de Email',
                    'mail_encryption_placeholder' => 'Criptografia de Email',

                    'pusher_label' => 'Pusher',
                    'pusher_app_id_label' => 'ID da Aplicação Pusher',
                    'pusher_app_id_palceholder' => 'ID da Aplicação Pusher',
                    'pusher_app_key_label' => 'Chave da Aplicação Pusher',
                    'pusher_app_key_palceholder' => 'Chave da Aplicação Pusher',
                    'pusher_app_secret_label' => 'Segredo da Aplicação Pusher',
                    'pusher_app_secret_palceholder' => 'Segredo da Aplicação Pusher',
                ],
                'buttons' => [
                    'setup_database' => 'Etapa 5: Configurar Banco de Dados',
                    'setup_application' => 'Etapa 6: Configurar Aplicação',
                    'install' => 'Etapa Final: Instalar',
                ],
            ],
        ],
        'classic' => [
            'templateTitle' => 'Etapa 3 | Configurações de Ambiente | Editor Clássico',
            'title' => 'Editor de Ambiente Clássico',
            'save' => 'Salvar .env',
            'back' => 'Usar Assistente de Formulário',
            'install' => 'Salvar e Instalar',
        ],
        'success' => 'Suas configurações de arquivo .env foram salvas.',
        'errors' => 'Não foi possível salvar o arquivo .env, por favor crie-o manualmente.',
    ],

    'install' => 'Instalar',

    /**
     *
     * Installed Log translations.
     *
     */
    'installed' => [
        'success_log_message' => 'Eventmie Pro 3.0 foi instalado com sucesso em ',
    ],

    /**
     *
     * Final page translations.
     *
     */
    'final' => [
        'title' => 'Instalação Concluída',
        'templateTitle' => 'Instalação Concluída',
        'finished' => 'A aplicação foi instalada com sucesso.',
        'migration' => 'Saída do Console de Migração e Seed:',
        'console' => 'Saída do Console da Aplicação:',
        'log' => 'Entrada de Log de Instalação:',
        'env' => 'Arquivo .env Final:',
        'exit' => 'Configuração Concluída. Prosseguir para o Site.',
    ],

    /**
     *
     * Update specific translations
     *
     */
    'updater' => [
        /**
         *
         * Shared translations.
         *
         */
        'title' => 'Eventmie Pro 3.0 Atualizador',

        /**
         *
         * Welcome page translations for update feature.
         *
         */
        'welcome' => [
            'title'   => 'Bem-vindo ao Atualizador',
            'message' => 'Bem-vindo ao assistente de atualização.',
        ],

        /**
         *
         * Welcome page translations for update feature.
         *
         */
        'overview' => [
            'title'   => 'Visão Geral',
            'message' => 'Há 1 atualização.|Há :number atualizações.',
            'install_updates' => "Instalar Atualizações"
        ],

        /**
         *
         * Final page translations.
         *
         */
        'final' => [
            'title' => 'Concluído',
            'finished' => 'O banco de dados da aplicação foi atualizado com sucesso.',
            'exit' => 'Clique aqui para sair',
        ],

        'log' => [
            'success_message' => 'Eventmie Pro 3.0 Instalador foi atualizado com sucesso em ',
        ],
    ],
];
